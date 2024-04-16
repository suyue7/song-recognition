# song-recognition
基于shazam算法的听歌识曲项目。
A song listening and music recognition project based on the shazam algorithm.

软件定位：
基于音频指纹技术的听歌识曲项目，旨在帮助用户识别任何一首歌曲的信息，包括歌曲名称、歌手信息等。通过先进的算法，快速准确地识别音频，为音乐爱好者提供便捷的歌曲检索体验。

基本功能：
·识别在线录制音乐的歌曲信息。
·提供简洁直观的用户界面，操作简单易上手。

安装必要环境：
·Python 3.x
·SQLAlchemy
·Matplotlib
·NumPy
·Pydub
·MySQL Connector
在终端或命令行界面中执行以下命令启动应用：

代码目录结构：
·detect_function.py：主要的识别函数，负责调用算法和数据库进行歌曲识别。
·finger.py：包含了特征提取和指纹生成的相关函数。
·functions.py：提供了一些辅助函数，包括音频处理和字符串处理等。
·save_function.py：负责将歌曲信息存储到数据库中。
·orm.py： 定义了数据库表格的结构和关联关系。

基本原理：
利用短时傅里叶变换进行特征提取，生成音频的指纹，并将指纹与数据库中的歌曲指纹进行比对，从而识别歌曲信息。

注意事项：
·确保输入的音频文件格式正确（mp3格式），并且音质清晰，以提高识别准确率。
·确保麦克风工作正常，并且周围环境安静，避免干扰。
