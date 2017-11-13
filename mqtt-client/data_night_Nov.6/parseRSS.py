for i in range(113):
    file_name = './'+str(i+1)+'/wifi_recored0'
    f = open(file_name,'r')
    header = f.readline()
    begin_index = header.index('BSSID')
    end_index = header.index('RSSI')+3

    records = []
    for line in f:
        tmp = line[begin_index:end_index].split()
        try:
            record = (tmp[0], int(tmp[1]))
            records.append(record)
        except IndexError:
            pass
        except ValueError:
            pass

    f.close()

    records.sort(key=lambda record: record[1], reverse=True)

    f = open('CandidateAP','a')
    for i in range(10):
        f.write(records[i][0]+' ')
        f.write(records[i][1].__str__()+'\n')
    f.close()

