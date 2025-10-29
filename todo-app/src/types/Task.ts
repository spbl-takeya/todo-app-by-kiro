/**
 * Task interface representing a todo item
 * 
 * Requirements covered:
 * - 1.3: System assigns unique ID and creation timestamp to tasks
 * - 2.2: System displays task title, creation time, and completion status
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  
  /** Title/description of the task */
  title: string;
  
  /** Whether the task is completed or not */
  completed: boolean;
  
  /** Timestamp when the task was created */
  createdAt: Date;
}