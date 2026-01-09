import { Repository } from './IRepository';
import { Project } from '../entities/Project';

export interface IProjectRepository extends Repository<Project> {
  findByOwnerId(ownerId: string): Promise<Project[]>;
  findByName(name: string, ownerId: string): Promise<Project | null>;
}
