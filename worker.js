/* eslint-disable import/no-named-as-default */
import { writeFile } from 'fs';
import { promisify } from 'util';
import Queue from 'bull/lib/queue';
import imgThumbnail from 'image-thumbnail';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './utils/db.js';
import Mailer from './utils/mailer.js';


const writeFileAsync = promisify(writeFile);
const fileQueue = new Queue('thumbnail generation');
const userQueue = new Queue('email sending');


/*
Generate thumbnail for the image with a given width size
*/
const generateThumbnail = async (filePath, size) => {
  const buffer = await imgThumbnail(filePath, { width: size });
  console.log('Generating file: ${filePath}, size: ${size}');
  return writeFileAsync(`${filePath}_${size}`, buffer);
};


//
fileQueue.process(async (job, done) => {
  const fileId = job.data.fileId || null;
  const userID = job.data.userID || null;

  if (!fileId) return done(new Error('Missing fileId'));
  if (!userID) return done(new Error('Missing userID'));

  console.log('Processing', job.data.name || '');
  const file = await (await dbClient.filesCollection()).findOne({
    _id: new mongoDBCore.BSON.ObjectId(fileId),
    userID: new mongoDBCore.BSON.ObjectId(userID),
  });

  if (!file) return done(new Error('File not found'));

  const sizes = [500, 250, 100];

  Promise.all(sizes.map((size) => generateThumbnail(file.localPath, size))).then(() => {
    console.log('Thumbnails generated');
    done();
  });
});

userQueue.process(async (job, done) => {
  const userId = job.data.userId || null;

  if (!userId) return done(new Error('Missing userId'));
  
  const user = await (await dbClient.usersCollection())
  .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });

  if (!user) return done(new Error('User not found'));

  console.log(`Welcome ${user.email}!`);

  // send an email to the user with a welcome message
  try {
    const mailSubject = 'Welcome to The Multilingual Files Manager';
    const mailContent = [
      '<div>',
      '<h3>Hello {{user.name}},</h3>',
      'Welcome to <a href="https://github.com/ChernetAsmamaw/Multilingual-File-Manager-Application">',
      'Multilingual File Manager</a>, ',
      'a simple file management API built with Node.js by ',
      '<a href="https://github.com/ChernetAsmamaw">Chernet</a> and ',
      '<a href="https://github.com/BevilMulore">Bevil</a>.',
      'We hope it meets your needs.',
      '</div>',
    ].join('');
    Mailer.sendMail(Mailer.buildMessage(user.email, mailSubject, mailContent));
    done();
  } catch (err) {
    done(err);
  }
});
