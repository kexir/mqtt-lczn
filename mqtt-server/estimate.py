import math
import numpy as np
import sys
sys.path.insert(0, '/Users/lyuqi/Downloads/DR/mqtt-lczn/common')
import conf


def gaussian(x, mu, sig):
	return (1./np.sqrt(2*np.pi)*sig)*np.exp(-np.power(x - mu, 2.) / (2 * np.power(sig, 2.)))

def estimate(obs):
	# cost = sys.maxint
	# ans = []
	# for i in range(0, conf.l):
	# 	for j in range(0, conf.w):
	# 		if conf.isValid(i,j):
	# 			r_hat = (i, j)
	# 			temp = expected_cost(r_hat, obs)
	# 			if temp < cost:
	# 				cost = temp
	# 				ans = r_hat
	# return ans
	return [20,30]

def expected_cost(r_hat, obs):
	expect = 0
	for i in range(0, conf.l):
		for j in range(0, conf.w):
			if conf.isValid(i,j):
				r = (i, j)
				prob = conf.Prob[r]
				if conf.ALG == "MEDE":
					expect = expect+prob*likelihood(r,obs)*cost_MEDE(r, r_hat, obs)
				expect = expect+prob*likelihood(r,obs)*cost_ML(r, r_hat, obs)
	return expect

def likelihood(r, obs):
	obs_r = []
	for x, y in zip(conf.Tx, conf.Ty):
		distance = math.sqrt((x-r[0])**2 + (y-r[1])**2)
		obs_r.append(-10 * conf.eta * np.log(distance))
	likelihood = 1
	for i in range(len(obs_r)):
		likelihood = likelihood*gaussian(obs[i], obs_r[i], conf.sigm)
	# print likelihood
	return likelihood

def cost_ML(r, r_hat, obs):
	if abs(r[0]-r_hat[0]) < conf.rad1 and abs(r[1]-r_hat[1]) < conf.rad1:
		return -1
	return 0

def cost_MEDE(r, r_hat, obs):
	return math.sqrt((r_hat[0]-r[0])**2 + (r_hat[1]-r[1])**2) 

def cost_MMSE(r, r_hat, obs):
	return (r_hat[0]-r[0])**2 + (r_hat[1]-r[1])**2 

# unit test of likelihood
# obs_raw = [-147.28938152135763, -103.84901750586434, -113.44605505930116]
# r = (25, 40)
# likelihood(r, obs_raw)
# ans = estimate(obs_raw)
# print(list(ans))
# return [23, 41] in about 2 min
