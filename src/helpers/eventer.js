import eventerChrome from './impl/eventerChrome';
import eventerEdge from './impl/eventerEdge';
import eventerFirefox from './impl/eventerFirefox';
import eventerOpera from './impl/eventerOpera';

const createAPI = () => {
	const impls = [
		eventerChrome,
		eventerEdge,
		eventerFirefox,
		eventerOpera,
	].filter(impl => {
		try {
			new impl();
			return true
		} catch (e) {
			return false
		}
	});

	const ValidImpl = impls.pop();
	if (!ValidImpl) {
		console.error('no valid extention APIs found')
	}
	return ValidImpl;
}

export default ( createAPI() )
