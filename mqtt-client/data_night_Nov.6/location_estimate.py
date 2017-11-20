import numpy as np
from scipy.spatial import distance
import sys

width = 132
height = 230

def isValid(x, y):
    if x in range(11,18) and y in range(130, 144):
        return False
    if x in range(18,29) and y in range(15, 144):
        return False
    if x in range(29,40) and (y in range(15, 30) or y in range(130, 144)):
        return False
    if x in range(40,64) and (y in range(15, 30) or y in range(130, 144) or y in range(216, 230)):
        return False
    if x in range(64,78) and y in range(15, 230):
        return False
    return True

def getTop10BSSID():
    list = []
    f = open('Top10')
    for line in f:
        list.append(line.strip())
    f.close()
    return list

def getRSSMatrix():
    top10 = getTop10BSSID()
    map_y = {}
    map_x = {}
    f = open('join_RSS_position','r')
    for line in f:
        info = line.split()
        BSSID = info[0]
        RSS = int(info[1])
        pos_x =  info[2][1:-1]
        pos_y =  info[3][:-1]
        if BSSID in top10:
            if BSSID not in map_y:
                map_y[BSSID] = np.array(RSS)
                map_x[BSSID] = np.matrix(pos_x + " " + pos_y)
            else:
                map_y[BSSID] = np.append(map_y[BSSID],RSS)
                map_x[BSSID] = np.concatenate((map_x[BSSID], np.matrix(pos_x + " " + pos_y)))
    f.close()
    return map_x, map_y

def main():
    map_x, map_y = getRSSMatrix()

    for key in map_x.keys():
        BSSID = key
        x = map_x[BSSID]
        y = map_y[BSSID]
        min = sys.maxint
        tmp = np.array([[0,0]])
        for i in range(width):
            for j in range(height):
                if isValid(i,j):
                    ap_pos = np.array([[i,j]])
                    dist = distance.cdist(x, ap_pos,'euclidean')
                    coefficient = np.polyfit(np.array(dist).flatten(), y, 1)
                    pred_y = np.polyval(coefficient,dist)
                    error = np.sqrt(np.sum((pred_y-y)**2))
                    if error < min:
                        min = error
                        tmp = ap_pos
        print tmp

if __name__ == "__main__":
    main()