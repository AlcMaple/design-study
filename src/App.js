import { useState, useEffect } from "react";

import SplitText from './components/SplitText';
import Loading from './components/Loading';

function App() {
  // 轮播文字
  const texts = [' Help make it happen', 'code style is freedom'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // 加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 每5秒切换文字
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 视频加载完成处理
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // 加载处理
  useEffect(() => {
    if (videoLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300)
      return () => clearTimeout(timer);
    }
  }, [videoLoaded])

  // 点击视频打开新窗口
  const handleVideoClick = () => {
    const videoUrl = '/Zypsy.mp4';
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        className="fixed inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-300 hover:opacity-80 z-0"
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={handleVideoLoad}
        onClick={handleVideoClick}
        onError={(e) => {
          console.error("视频加载失败", e);
        }}
      >
        <source src="/Zypsy.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/30 z-5 pointer-events-none"></div>

      <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-full text-white font-bold px-0 py-0">
          <SplitText
            key={texts[currentTextIndex]} // 每次文字变化时强制重新挂载
            text={texts[currentTextIndex]}
            className="text-[10vw] leading-none font-extrabold whitespace-pre" // 字体大小随视口变化
            textAlign="left" // 从左对齐
          />
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
}

export default App;