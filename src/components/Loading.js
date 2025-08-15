import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const Loading = () => {
    const animationContainer = useRef(null);
    const animationInstance = useRef(null);

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

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="w-16 h-16">
                <div
                    ref={animationContainer}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
};

export default Loading;