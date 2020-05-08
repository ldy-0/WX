function getLocation(coordinate){
	return new Promise(resolve => {
		uni.getLocation({
			type: coordinate || 'wgs84',
			success: res => resolve(resolve),
			fail: err => resolve(err.errMsg || err.message),
			// complete: () => {}
		});
	});
}
export default {
	getLocation,
}