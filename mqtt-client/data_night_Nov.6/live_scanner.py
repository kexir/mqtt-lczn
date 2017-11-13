import os
import sys

if __name__ == '__main__':
	dir_name = sys.argv[1]
	dir_path = os.path.dirname(os.path.realpath(__file__)) + "/" + dir_name
	if not os.path.exists(dir_path):
		os.mkdir(dir_path)
	for i in range(3):
		result = os.system('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s > ' + dir_path + "/wifi_record"+ str(i))
	