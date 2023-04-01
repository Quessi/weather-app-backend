import Codes from './CountryCodes.json'


export default (countryCode: string) => {
    const country = Codes?.[countryCode as keyof typeof Codes];
    if (!country) {
        throw new Error('Invalid country code');
    }
    
}