const { Worker } = require('worker_threads');

exports.mailWorker = receivers => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__dirname + '/mailer.js');

    worker.postMessage(receivers);

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
