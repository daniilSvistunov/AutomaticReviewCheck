import fs from 'fs';

import { mockTasks } from "./data/data";
import { mock } from "./mockAdapter";



mock.onGet("task/hallo").reply(200, mockTasks);
mock.onPost("task/hallo").reply(config => {
    // config.data contains the data sent in the post request
    // Write the data into a file
   console.log(config.data)
    // Respond with a status code and a message
    return [200, { message: 'Data received and written to file' }];
  });
