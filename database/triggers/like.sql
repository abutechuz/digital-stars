create or replace function after_like_fn() returns trigger language plpgsql as $$

  begin
    update blogs as b set blog_like = blog_like + 1 where blog_id = 1;
  end;

$$;
