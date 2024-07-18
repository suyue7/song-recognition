import librosa
import numpy as np
# 导入模块
import os
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt
from pydub import AudioSegment
import numpy as np
import hashlib
from scipy.ndimage import (binary_erosion, generate_binary_structure, iterate_structure)
from scipy.ndimage import maximum_filter
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from scripts.fft.orm import Songs, Fingerprints
from scripts.functions import generateFingerprint

from matplotlib.colors import Normalize
from scipy.signal import wiener, find_peaks


def finger(filename):
    audiofile = AudioSegment.from_file(filename)

    data = np.frombuffer(audiofile.raw_data, np.int16)
    channels = []
    for chn in range(audiofile.channels):
        channels.append(data[chn::audiofile.channels])
    fs = audiofile.frame_rate
    # print(fs)

    # fft size
    fft = 4096
    # 重叠
    nlap = fft * 0.5
    # 第一个返回值是短时傅里叶变换之后的二维数组，数组说明下方
    spectrum, f, t = mlab.specgram(channels[0], NFFT=fft, window=mlab.window_hanning, Fs=fs, noverlap=int(nlap))

    # 值转换转为以10为底的对数值，并乘以10，如果为0，保持为0
    spectrum = 10 * np.log10(spectrum, out=np.zeros_like(spectrum), where=(spectrum != 0))
    # print("spectrum_log: ", spectrum)

    # 应用维纳滤波进行去噪
    # spectrum = wiener(spectrum)

    # 根据频谱数据的最大值和最小值来选择归一化范围
    norm = Normalize(vmin=spectrum.min(), vmax=spectrum.max())

    plt.figure(figsize=(10, 6))
    plt.imshow(spectrum, origin='lower', aspect='auto', cmap='viridis',
               extent=[t.min(), t.max(), f.min(), f.max()], norm=norm)
    plt.xlabel('Time (s)')
    plt.ylabel('Frequency (Hz)')
    plt.title('Spectrogram')
    plt.colorbar(label='Amplitude (dB)')
    # plt.show()

    struct = generate_binary_structure(2, 2)

    neighborhood = iterate_structure(struct, 10)

    local_max = maximum_filter(spectrum, footprint=neighborhood) == spectrum
    # background是bool二维数组， 0为true 非0false
    background = (spectrum == 0)
    eroded_background = binary_erosion(background, structure=neighborhood, border_value=1)
    detected_peaks = local_max != eroded_background

    amps = spectrum[detected_peaks]
    freqs, times = np.asarray(detected_peaks).nonzero()

    amps1 = amps.flatten()
    filter_idxs = np.where(amps > 10)

    freqs_filter = freqs[filter_idxs]
    times_filter = times[filter_idxs]

    peaks = list(zip(times_filter, freqs_filter))
    peaks.sort(key=lambda x: x[0])
    # print(peaks)

    hashes = generateFingerprint(peaks)

    return hashes
