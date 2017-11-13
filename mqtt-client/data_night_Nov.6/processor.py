import operator
f = open('CandidateAP','r')

AP_freq = {}
for line in f:
    tmp = line.split()
    if tmp[0] not in AP_freq:
        AP_freq[tmp[0]] = 1
    else:
        AP_freq[tmp[0]] = AP_freq[tmp[0]] +1
f.close()

sorted_AP = sorted(AP_freq.items(), key=operator.itemgetter(1), reverse=True)

f = open('Top10','a')
for i in range(10):
    f.write(sorted_AP[i][0]+'\n')
f.close()