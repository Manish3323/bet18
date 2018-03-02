import _ from 'lodash';
import moment from 'moment';

export const ObjectsToArray =(objects)=>{
    return _.map(objects,(val,key)=>{
        return {...val,key}
    });
}

export const findByProp = (array,prop,valueToMatch) =>{
    return _.find(array, (item)=> { return item[prop] === valueToMatch });
}

export const convertDateTimeToDate=(dateTime)=>{
    return moment(dateTime).locale('in').format('DD/MM/YY');
}

export const convertDateTimeToTime=(dateTime)=>{
    return moment(dateTime).locale('in').format('HH:mm');
}

