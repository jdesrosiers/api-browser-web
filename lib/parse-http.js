const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];

export { subtypeName };
