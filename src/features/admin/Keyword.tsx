import { getSearchKeywords } from './api/keyword';

const Keyword = async () => {
	const keywords = await getSearchKeywords('');
	console.log(keywords);
	return <div>keyword</div>;
};

export default Keyword;
