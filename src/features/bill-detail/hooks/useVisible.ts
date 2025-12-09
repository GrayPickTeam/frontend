import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

export const useVisible = () => {
	const targetRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(true);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, 'change', () => {
		const rect = targetRef.current?.getBoundingClientRect();
		if (!rect) return;
		const isIntersecting = rect.top < window.innerHeight;
		const nextVisible = !isIntersecting;

		if (nextVisible !== visible) {
			setVisible(nextVisible);
		}
	});

	return { targetRef, visible };
};
