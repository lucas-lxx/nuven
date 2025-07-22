function base64Storage() {
  return {
    _handleFile(req, file, cb) {
      const chunks = [];

      file.stream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      file.stream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString("base64");
        console.log(`buffer.length = ${buffer.length}`);
        console.log(`base64.length = ${base64.length}`);

        req.base64file = {
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: base64.length,
        };

        cb(null, {
          size: base64.length,
        });
      });

      file.stream.on("error", (err) => cb(err));
    },
    _removeFile(req, file, cb) {
      cb(null);
    },
  };
}

module.exports = base64Storage;
