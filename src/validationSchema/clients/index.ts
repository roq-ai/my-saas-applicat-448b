import * as yup from 'yup';

export const clientValidationSchema = yup.object().shape({
  fitness_goal: yup.string().required(),
  preferences: yup.string().required(),
  user_id: yup.string().nullable(),
});
