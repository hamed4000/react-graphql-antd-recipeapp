import { message } from 'antd';

export const successMessage = msg => {
  message.success(msg);
};

export const errorMessage = msg => {
  message.error(msg);
};

export const warningMessage = msg => {
  message.warning(msg);
};

// import { notification } from 'antd';
//
// const Notification = (type, message, description) => {
//   notification[type]({
//     message,
//     description: description
//         ? description
//         : 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
//   });
// };
//
// export default Notification;
