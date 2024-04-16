# 导入库函数
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
# 导入模块
from scripts.finger import (finger,Fingerprints)
from scripts.functions import getMD5_SHA256,get_integer_before_underscore
from scripts.fft.orm import Songs
from scripts.record import record

"""
函数名:detect_by_mic
input :不需要
output:对应歌名
"""
def detect_by_mic():
    # 开始录音
    record()
    filename = "data/output.wav"
    hashs = finger(filename)

    engine = create_engine('mysql+mysqlconnector://root:root@localhost:3306/shazam')
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    ##匹配过程
    hash_map = {}
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
    # 字典按val排序
    print(sorted(hash_map.items(), key=lambda kv: (kv[1], kv[0]),reverse = True))

    '''返回对应歌曲'''
    # 那么假设匹配次数做多的就是检测出来的歌曲
    max_match = max(hash_map.items(), key=lambda x: x[1])
    max_song_id, max_match_count = max_match
    # 设定阈值，如果大于一个阈值才算是正常匹配
    if max_match_count >1:
        print("最多匹配的歌曲ID:",max_song_id)
        s = max_song_id
        sc = get_integer_before_underscore(s)
        print("数据库里songs表对应ID：",sc)
        query = text("SELECT songs.name FROM songs WHERE songs.id = :value_to_find")
        result = session.execute(query, {'value_to_find': sc})
        for row in result:
            print(row.name)
        print("匹配次数:",max_match_count)
        print("匹配成功")
        return row.name
    else:
        print("匹配不成功")
        return None