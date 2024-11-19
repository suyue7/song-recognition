# 导入库函数
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
# 导入模块
from scripts.finger import (finger,Fingerprints)
from scripts.functions import getMD5_SHA256
from scripts.fft.orm import Songs

'''
函数名: save_function
input : 数据集文件夹，就起名字叫data
output: 没有
'''
datafile = "data"
def save_function(datafile):
    # 创建数据库
    engine = create_engine('mysql+mysqlconnector://root:sysu@localhost:3306/songrecogn')
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    # 对于指定路径文件提取并存储为列表

    names = os.listdir(datafile)
    # 批量导入歌曲存入到数据库当中
    for name in names:
        filename = "data/" + name
        hashs = finger(filename)
        song = Songs(name=filename, filehash=getMD5_SHA256(filename), fingerprinted=True)
        # 创建DBSession类型:
        session.add(song)
        session.flush()
        new_song_id = song.id
        # 保存本首歌的指纹
        for fp in hashs:
            fp_record = Fingerprints(song_id=new_song_id, fingerprint=fp[0], offset=int(fp[1]))
            session.add(fp_record)
    #结束数据库
    session.commit()

save_function("data")