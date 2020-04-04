import React, {useEffect} from "react";

function useInterval(callback: {(): void}, delay: number) {
  const savedCallback = React.useRef();

  // 保存新回调
  useEffect(() => {
    // @ts-ignore
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval

