export type Mapper<Entity, Repository> = {
  toRepository: (data: Entity) => Partial<Repository>;
  toEntity: (data: Repository) => Entity;
};
