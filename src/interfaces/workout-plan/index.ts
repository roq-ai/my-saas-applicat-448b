import { ClientInterface } from 'interfaces/client';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WorkoutPlanInterface {
  id?: string;
  client_id?: string;
  personal_trainer_id?: string;
  plan_data: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  user?: UserInterface;
  _count?: {};
}

export interface WorkoutPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  client_id?: string;
  personal_trainer_id?: string;
  plan_data?: string;
}
