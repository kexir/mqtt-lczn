import math
import numpy as np
import sys
sys.path.insert(0, '/Users/lyuqi/Downloads/DR/mqtt-lczn/common')
import conf


# static localization
def read_static():
	obs_raw = []
	r = (25,40)
	for x, y in zip(conf.Tx, conf.Ty):
		distance = math.sqrt((x-r[0])**2 + (y-r[1])**2)
		obs_raw.append(-10 * conf.eta * np.log(distance))
	obs = [x + y for x, y in zip(obs_raw, np.random.rand(3))]
	return obs

def read_dynamic(next):
	positions = [(8,10),(8,30),(8,50),(15,50),(26,50),(26,70)]
	r = positions[next%len(positions)]
	obs_raw = []
	for x, y in zip(conf.Tx, conf.Ty):
		distance = math.sqrt((x-r[0])**2 + (y-r[1])**2)
		obs_raw.append(-10 * conf.eta * np.log(distance))
	obs = [x + y for x, y in zip(obs_raw, np.random.rand(3))]
	return obs
