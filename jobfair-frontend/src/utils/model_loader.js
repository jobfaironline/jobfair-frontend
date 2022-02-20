import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

export async function loadModel(url) {
    return new Promise((resolve, reject) => {
        loader.load(url, data => resolve(data), null, error => reject(error));
    });
}