import Json from "../repositories/jsonRepository";
import IJson from "../interfaces/json";

export type jsonType = {
    route: string;
    data: Object;
}
export default class Model {
    getJson(route: string): Promise<jsonType> {
        return Json.findOne({route: route})
            .exec()
            .then((json) => {
                if (json) {
                    return {
                        route: json.route,
                        data: json.data
                    }
                } else {
                    throw new Error(`Json with route ${route} does't exist`);
                }
            })
            .catch (err => {
                throw new Error(err); 
            })
    }
    
    addJson(route: string, data: Object): Promise<IJson> {
        return Json.findOneAndDelete({route: route})
            .then(() => {
                const newJson = new Json({
                    route: route,
                    data: data
                });
                return newJson.save();
            })
            .catch ((err) => {
                throw new Error(err);
            });
    }
}



