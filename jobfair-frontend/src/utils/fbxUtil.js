import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

const loader = new FBXLoader()


export const parseFBXModel = async (url) => {
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            data => resolve(data),
            null,
            error => reject(error)
        )
    })
}