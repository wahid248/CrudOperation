using Core.Abstruct.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Data.Base
{
    public class Repository<TEntity, T> : IRepository<TEntity, T> where TEntity : class, IEntity<T>, new()
    {
        protected readonly DbContext _dbContext;
        protected readonly DbSet<TEntity> _dbSet;
        private readonly DateTime _currentDateTime;

        public Repository(DataContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
            _currentDateTime = DateTime.UtcNow;
        }

        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.Where(predicate).FirstOrDefault();
        }
        public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate = null)
        {
            return predicate != null ? _dbSet.Where(predicate).ToList() : _dbSet.ToList();
        }
        public void Add(TEntity entity, string userId = null)
        {
            entity.CreatedOn = _currentDateTime;
            entity.CreatedBy = userId;
            _dbSet.Add(entity);
        }
        public void AddRange(IEnumerable<TEntity> entities, string userId = null)
        {
            foreach (var entity in entities)
            {
                entity.CreatedOn = _currentDateTime;
                entity.CreatedBy = userId;
            }
            _dbSet.AddRange(entities);
        }
        public void Update(TEntity entity, string userId = null)
        {
            entity.ModifiedOn = _currentDateTime;
            entity.ModifiedBy = userId;
            _dbContext.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void UpdateRange(IEnumerable<TEntity> entities, string userId = null)
        {
            foreach (var entity in entities)
            {
                entity.ModifiedOn = _currentDateTime;
                entity.ModifiedBy = userId;
            }
            _dbContext.AttachRange(entities);
            foreach (var entity in entities)
                _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(TEntity entity, string userId = null)
        {
            entity.IsDeleted = true;
            entity.ModifiedOn = _currentDateTime;
            entity.ModifiedBy = userId;
            _dbContext.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(Expression<Func<TEntity, bool>> predicate, string userId = null)
        {
            var entities = _dbSet.Where(predicate).ToList();
            entities.ForEach(p => { p.IsDeleted = true; p.ModifiedOn = _currentDateTime; p.ModifiedBy = userId; });
            DeleteRange(entities, userId);
        }
        public void DeleteRange(IEnumerable<TEntity> entities, string userId = null)
        {
            entities.ToList().ForEach(p => { p.IsDeleted = true; p.ModifiedOn = _currentDateTime; p.ModifiedBy = userId; });
            _dbContext.AttachRange(entities);
            foreach (var entity in entities)
                _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void DeletePermanantly(TEntity entity)
        {
            _dbContext.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Deleted;
        }
        public void DeletePermanantly(Expression<Func<TEntity, bool>> predicate)
        {
            var entities = _dbSet.Where(predicate).ToList();
            DeleteRangePermanantly(entities);
        }
        public void DeleteRangePermanantly(IEnumerable<TEntity> entities)
        {
            _dbContext.AttachRange(entities);
            foreach (var entity in entities)
                _dbContext.Entry(entity).State = EntityState.Deleted;
        }
        
        public void Restore(TEntity entity, string userId = null)
        {
            entity.IsDeleted = false;
            entity.ModifiedOn = _currentDateTime;
            entity.ModifiedBy = userId;
            _dbContext.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void Restore(Expression<Func<TEntity, bool>> predicate, string userId = null)
        {
            var entities = _dbSet.Where(predicate).ToList();
            entities.ForEach(p => { p.IsDeleted = false; p.ModifiedOn = _currentDateTime; p.ModifiedBy = userId; });
            RestoreRange(entities, userId);
        }
        public void RestoreRange(IEnumerable<TEntity> entities, string userId = null)
        {
            entities.ToList().ForEach(p => { p.IsDeleted = false; p.ModifiedOn = _currentDateTime; p.ModifiedBy = userId; });
            _dbContext.AttachRange(entities);
            foreach (var entity in entities)
                _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.Where(predicate).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate = null)
        {
            return predicate != null ? await _dbSet.Where(predicate).ToListAsync() : await _dbSet.ToListAsync();
        }
        public async Task AddAsync(TEntity entity, string userId = null)
        {
            entity.CreatedOn = _currentDateTime;
            entity.CreatedBy = userId;
            await _dbSet.AddAsync(entity);
        }
        public async Task AddRangeAsync(IEnumerable<TEntity> entities, string userId = null)
        {
            foreach (var entity in entities)
            {
                entity.CreatedOn = _currentDateTime;
                entity.CreatedBy = userId;
            }
            await _dbSet.AddRangeAsync(entities);
        }
    }
}
