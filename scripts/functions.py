# 导入模块
from pydub import AudioSegment
import hashlib
import os

# 读取MP3函数
def readMp3AndCovertWav(filename):
    song = AudioSegment.from_mp3(filename)
    song.export(filename + ".wav", format="wav")
 
# 输出字符串长度
def print2DArrLen(arr):
    print(len(arr))
    print(len(arr[0]))


def print2DArr(arr):
    for i in range(len(arr)):  # 控制行，0~2
        for j in range(len(arr[i])):  # 控制列
            num = int(arr[i][j])
            if(num < 0):
                print(0,end="")
            elif(num < 10):
                print(1,end="")
            elif(num < 20):
                print(5,end="")
            else:
                print(9,end="")
        print()


def getMD5_SHA256(filename_or_string, md5_sha256="sha256"):
    d = hashlib.md5() if md5_sha256=="md5" else hashlib.sha256()
    # d = hashlib.md5("asfd".encode("utf-8")) if md5_sha256=="md5" else hashlib.sha256("asfd".encode("utf-8"))#加盐
    if os.path.isfile(filename_or_string):
        with open(filename_or_string, 'rb') as f:
            while True:
                buf = f.read(4096)
                if not buf:
                    break
                d.update(buf)
        return d.hexdigest()
    else:
        d.update(filename_or_string.encode('utf-8'))
        return d.hexdigest()
 
 
#参数可以调整
def generateFingerprint(peaks):
    hashes = []
    for i in range(len(peaks) - 20):
        for j in range(20):
            t1 = peaks[i][0]
            t2 = peaks[i + j][0]
            freq1 = peaks[i][1]
            freq2 = peaks[i + j][1]
            t_delta = t2 - t1
            if t_delta >= 9 and t_delta <= 200:
                h = hashlib.sha256(("%s_%s_%s" % (str(freq1), str(freq2), str(t_delta))).encode())
                hashes.append((h.hexdigest()[0:32], t1))
    return hashes

def get_integer_before_underscore(s):
    # 找到下划线之前的所有字符
    before_underscore = s.split('_')[0]
    try:
        return before_underscore
    except ValueError:
        print("无法将字符串转换为整数")
        return None