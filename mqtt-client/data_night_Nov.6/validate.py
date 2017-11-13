def readTop():
    ans = []
    f = open('Top10', 'r')
    for line in f:
        ans.append(line.strip('\n'))
    return ans

def validCandidateList(file_name, top):
    f = open(file_name,'r')
    count = 0
    header = f.readline()
    BSSID_index = header.index('BSSID')
    RSSI_index = header.index('RSSI')
    for line in f:
        try:
            id = line[BSSID_index:RSSI_index-1]
            strength = int(line[RSSI_index:RSSI_index+3])
            if id in top and strength > -75:
                count = count+1
        except IndexError:
            pass
        except ValueError:
            pass
    f.close()
    # print count
    if count >= 3:
        return True
    return False

for i in range(113):
    file_name = './'+str(i+1)+'/wifi_recored0'
    top = readTop()
    isValid = validCandidateList(file_name=file_name, top=top)
    if not isValid:
        print file_name

print "valid process end."