export class ClassController {
  constructor() {}

  helloWorld(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  }
}
