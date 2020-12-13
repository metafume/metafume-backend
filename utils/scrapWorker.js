const { Worker } = require('worker_threads');

exports.scrapWorker = data => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__dirname + '/scraper.js');

    worker.postMessage(data);

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
