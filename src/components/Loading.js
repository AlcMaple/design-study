import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

const Loading = ({ onComplete, videoLoaded }) => {
    const animationContainer = useRef(null);
    const animationInstance = useRef(null);
    const [animationStage, setAnimationStage] = useState('lottie'); // 'lottie' -> 'lottie-fade' -> 'text-wait' -> 'text-in' -> 'text-show' -> 'text-wait2' -> 'text-out' -> 'bg-wait' -> 'background' -> 'complete'
    const [showTexts, setShowTexts] = useState([false, false]);
    const [lottieOpacity, setLottieOpacity] = useState(1);

    const texts = ['code style', 'is freedom.'];

    useEffect(() => {
        if (animationContainer.current) {
            // 初始化 Lottie 动画
            animationInstance.current = lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/6756fc806ad3253d015745ae_zypsy_loader.json'
            });
        }

        // 清理函数
        return () => {
            if (animationInstance.current) {
                animationInstance.current.destroy();
                animationInstance.current = null;
            }
        };
    }, []);

    // 开始动画序列 - 只有视频加载完成后才开始
    useEffect(() => {
        if (videoLoaded && animationStage === 'lottie') {
            // 开始lottie淡出动画
            setAnimationStage('lottie-fade');
            setLottieOpacity(0);

            // lottie淡出300ms + 等待300ms = 600ms后开始文本动画
            setTimeout(() => {
                setAnimationStage('text-in');
                showTextsSequentially();
            }, 800);
        }
    }, [videoLoaded]);

    // 逐个显示文本
    const showTextsSequentially = () => {
        // 显示第一个文本
        setTimeout(() => {
            setShowTexts([true, false]);
        }, 50);

        // 300ms后显示第二个文本
        setTimeout(() => {
            setShowTexts([true, true]);

            // 第二个文本完全出现后等待300ms
            setTimeout(() => {
                setAnimationStage('text-out');
                hideTextsSequentially();
            }, 300);
        }, 600);
    };

    // 逐个隐藏文本
    const hideTextsSequentially = () => {
        // 隐藏第一个文本
        setShowTexts([false, true]);

        // 300ms后隐藏第二个文本
        setTimeout(() => {
            setShowTexts([false, false]);

            // 文本全部隐藏后等待300ms，然后开始背景消失
            setTimeout(() => {
                setAnimationStage('background');

                // 背景消失 300ms 后完成
                setTimeout(() => {
                    setAnimationStage('complete');
                    onComplete?.();
                }, 300);
            }, 600);
        }, 300);
    };

    if (animationStage === 'complete') {
        return null;
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
            style={{
                transform: animationStage === 'background' ? 'translateY(-100%)' : 'translateY(0)',
                transition: animationStage === 'background' ? 'transform 0.3s ease-out' : 'none'
            }}
        >
            {/* Lottie 动画 */}
            {(animationStage === 'lottie' || animationStage === 'lottie-fade') && (
                <div
                    className="w-16 h-16"
                    style={{
                        opacity: lottieOpacity,
                        transition: 'opacity 0.5s ease-out'
                    }}
                >
                    <div
                        ref={animationContainer}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* 文本动画 */}
            {(animationStage === 'text-in' || animationStage === 'text-out') && (
                <div className="text-white font-bold">
                    <div className="flex items-center space-x-4">
                        {texts.map((text, index) => (
                            <span
                                key={index}
                                className="text-6xl font-extrabold"
                                style={{
                                    opacity: showTexts[index] ? 1 : 0,
                                    transform: showTexts[index]
                                        ? 'translateX(0)'
                                        : animationStage === 'text-out'
                                            ? 'translateX(-16px)' // 向左滑出
                                            : 'translateX(16px)', // 向左滑入
                                    transition: 'all 0.3s ease-out'
                                }}
                            >
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loading;