# scenario 
# 10
# | (1,8)
# |
# |        (4,5)
# |
# | (1.5,3)
# ______________
#                6
host = "neptune.usc.edu"
port = 1883
keep_alive = 60
RETRY_LIMIT = 5

l = 53                     # length of the grid.(x-dimension) 53 mm
w = 94                     # breadth of the grid.(y-dimension) 94 mm
total_area = 109

sigm = 16.16               # S.D of the log normal R.V divided by 10
eta = 3.93                 # Path loss factor

rad1 = 0.1                   # d1 in P(d1) in units of gran
rad2 = 1.6                   # d2 in P(d2) in units of gran

# Uncomment the code below to chose a random topology. 

# Arrange the transmitters in uniform grid on your space of interest.
# gridX = 4
# gridY = 4
# n = gridX * gridY  # (N)umber of transmitters

# Position of the transmitters.
Tx = [10,15,40]
Ty = [80,30,50]

# # Position of the receiver
xRec = 25
yRec = 40

def isValid(x, y):
	if 0 <= x < 6 and y in range(48, 54):
		return True
	if 6 <= x < 10 and y in range(0, 54):
		return True
	if 10 <= x < 15 and (y in range(6, 11) or y in range(48, 54)):
		return True
	if 15 <= x < 22 and (y in range(6, 11) or y in range(48, 54) or y in range(90, 95)):
		return True
	if 22 <= x < 29 and y in range(6, 95):
		return True
	if 29 <= x < 53 and y in range(6, 10):
		return True
	return False

# prior prob
Prob = {}
for i in range(0, l):
	for j in range(0, w):
		r = (i, j)
		if isValid(i,j):
			Prob[r] = 1.0/total_area
		else:
			Prob[r] = 0.0
