
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# 导入模块
from scripts.finger import finger,Fingerprints
from scripts.functions import getMD5_SHA256,get_integer_before_underscore
from scripts.fft.orm import Songs

'''
函数名: detect_function
input : 需要匹配的录音路径
output: 匹配成功返回歌名
        匹配失败返回None
'''
# 导入库函数
import sys
def detect_function(filename):
    # print("test")
    hashs = finger(filename)

    # 调用数据库指定表
    engine = create_engine('mysql+mysqlconnector://root:sysu@localhost:3306/songrecogn')
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    ##匹配过程
    hash_map = {}
    # 遍历指纹
    for sample in hashs:
        fp = sample[0]
        sample_offset=int(sample[1])
        match_fps = session.query(Fingerprints).filter(Fingerprints.fingerprint==fp).all()
        for match_fp in match_fps:
            key = str(match_fp.song_id)+"_"+str(match_fp.offset - sample_offset)
            if key in hash_map.keys():
                hash_map[key] = hash_map[key] + 1
            else:
                hash_map[key] = 1
    
    # 那么假设匹配次数做多的就是检测出来的歌曲
    max_match = max(hash_map.items(), key=lambda x: x[1])
    max_song_id, max_match_count = max_match
    # 设定阈值，如果大于一个阈值才算是正常匹配
    if max_match_count >1:
        # print("the most matched song_ID: ",max_song_id)
        s= max_song_id
        sc = get_integer_before_underscore(s)
        print("song_ID: ",sc)
        query = text("SELECT songs.name FROM songs WHERE songs.id = :value_to_find")
        result = session.execute(query, {'value_to_find': sc})
        # for row in result:
        #    print(row.name)
        # print("match times: ",max_match_count)
        # print("success")
        # return row.name
    else:
        print("-1")
        # return None
    
detect_function(sys.argv[1])