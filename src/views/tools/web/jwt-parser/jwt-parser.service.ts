import { type JwtHeader, type JwtPayload, jwtDecode } from 'jwt-decode';
import _ from 'lodash';
import { ALGORITHM_DESCRIPTIONS, CLAIM_DESCRIPTIONS } from './jwt-parser.constants';

export { decodeJwt };

const decodeJwt = ({ jwt }: { jwt: string }) => {
    const rawHeader = jwtDecode<JwtHeader>(jwt, { header: true });
    const rawPayload = jwtDecode<JwtPayload>(jwt);

    const header = _.map(rawHeader, (value, claim) => parseClaims({ claim, value }));
    const payload = _.map(rawPayload, (value, claim) => parseClaims({ claim, value }));

    return {
        header,
        payload,
    };
}

const parseClaims = ({ claim, value }: { claim: string; value: unknown }) => {
    const claimDescription = CLAIM_DESCRIPTIONS[claim];
    const formattedValue = _.isPlainObject(value) ? JSON.stringify(value, null, 3) : _.toString(value);
    const friendlyValue = getFriendlyValue({ claim, value });

    return {
        value: formattedValue,
        friendlyValue,
        claim,
        claimDescription,
    };
}

const getFriendlyValue = ({ claim, value }: { claim: string; value: unknown }) => {
    if (['exp', 'nbf', 'iat'].includes(claim)) {
        return dateFormatter(value);
    }

    if (claim === 'alg' && _.isString(value)) {
        return ALGORITHM_DESCRIPTIONS[value];
    }

    return undefined;
}

const dateFormatter = (value: unknown) => {
    if (_.isNil(value)) {
        return undefined;
    }
    const date = new Date(Number(value) * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}