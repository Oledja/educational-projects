import { Request, Response} from 'express';
import Model, {jsonType} from "../models/jsonModel";

const model = new Model();

export function homePage(req: Request, res: Response) {
    res.render("index");
}

export const getJson = async function(req: Request, res: Response): Promise<void> {
    try {
        const route = req.params.route;
        const json: jsonType = await model.getJson(route)
        if (json) {
            res.render("jsonView", {data: JSON.stringify(json.data)});
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({Error: err.message});
        }
    }
}

export const addJson = async function(req: Request, res: Response) {   
    try {
        const data: Object | string =  req.body;
        const route: string = req.params.route;
        const json: jsonType = await model.addJson(route, data);
        if (json) {
            res.status(200).json({message: "json saved successfully"});
        } else {
            throw new Error("json not saved");
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({Error: err.message});
        }
    }
}


