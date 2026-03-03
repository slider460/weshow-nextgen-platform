import { Composition } from 'remotion';
import { AdaptationComposition } from './AdaptationComposition';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="AdaptationComponent"
                component={AdaptationComposition}
                durationInFrames={300} // 10 seconds at 30fps
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
