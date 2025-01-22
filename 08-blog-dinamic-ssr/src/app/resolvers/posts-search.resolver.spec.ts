import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { postsSearchResolver } from './posts-search.resolver';

describe('postsSearchResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => postsSearchResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
