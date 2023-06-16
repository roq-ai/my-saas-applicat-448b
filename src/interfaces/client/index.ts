import { WorkoutPlanInterface } from 'interfaces/workout-plan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  user_id?: string;
  fitness_goal: string;
  preferences: string;
  created_at?: any;
  updated_at?: any;
  workout_plan?: WorkoutPlanInterface[];
  user?: UserInterface;
  _count?: {
    workout_plan?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  fitness_goal?: string;
  preferences?: string;
}
