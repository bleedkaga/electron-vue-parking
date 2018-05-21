import fs from 'fs'
import path from 'path'
import { remote } from 'electron'

export default {
	// content: path.join(remote.app.getPath('documents'), '/smart_parking_config.json')
	content: fs.readFileSync(path.join(remote.app.getPath('documents'), '/smart_parking_config.json'), 'utf8', (err, data) => {
		if(err) throw err;
		return data.toString();
	})
}