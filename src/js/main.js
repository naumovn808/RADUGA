

(async () => {
	if (document.querySelector('.wrapper')) {
		try {
			const { test } = await import(/* webpackChunkName: "test" */ './helpers/test.js');
			test();
		} catch (error) {
			console.error('Error loading test module:', error);
		}
	}
})();
