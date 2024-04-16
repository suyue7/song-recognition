import threading
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from scripts.finger import (finger, Fingerprints)
from scripts.functions import getMD5_SHA256, get_integer_before_underscore
from scripts.fft.orm import Songs
from scripts.record import record

# 录音线程
def record_thread(filename):
    record()

# 搜索线程
def search_thread(filename, event):
    hashs = finger(filename)
    engine = create_engine('mysql+mysqlconnector://root:sysu@localhost:3306/songrecogn')
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    hash_map = {}
    for sample in hashs:
        fp = sample[0]
        sample_offset = int(sample[1])
        match_fps = session.query(Fingerprints).filter(Fingerprints.fingerprint == fp).all()
        for match_fp in match_fps:
            key = str(match_fp.song_id) + "_" + str(match_fp.offset - sample_offset)
            if key in hash_map.keys():
                hash_map[key] = hash_map[key] + 1
            else:
                hash_map[key] = 1

    max_match = max(hash_map.items(), key=lambda x: x[1])
    max_song_id, max_match_count = max_match

    if max_match_count > 1:
        print("最多匹配的歌曲ID:", max_song_id)
        s = max_song_id
        sc = get_integer_before_underscore(s)
        print("数据库里songs表对应ID：", sc)
        query = text("SELECT songs.name FROM songs WHERE songs.id = :value_to_find")
        result = session.execute(query, {'value_to_find': sc})
        for row in result:
            print(row.name)
        print("匹配次数:", max_match_count)
        print("匹配成功")
        event.set()  # 通知主线程搜索完成
        return row.name
    else:
        print("匹配不成功")
        event.set()  # 通知主线程搜索完成
        return None

# 主函数
def detect_by_mic():
    filename = "data/output.wav"
    event = threading.Event()

    # 创建并启动录音线程
    record_thread_instance = threading.Thread(target=record_thread, args=(filename,))
    record_thread_instance.start()

    # 创建并启动搜索线程
    search_thread_instance = threading.Thread(target=search_thread, args=(filename, event))
    search_thread_instance.start()

    # 等待搜索线程结束或录音线程结束
    while not event.is_set() and record_thread_instance.is_alive():
        record_thread_instance.join(timeout=1)

    # 停止录音线程
    record_thread_instance.join()

    # 等待搜索线程结束
    search_thread_instance.join()

if __name__ == "__main__":
    detect_by_mic()