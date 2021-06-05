// Orginal Gist from gengue, Genesis Guerrero Martinez
// https://gist.github.com/gengue/20dc3a80d808ee908380488ce673542c

import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "./useDebounce";

const DEFAULT_FUSE_OPTIONS = {
  shouldSort: true,
  location: 0,
  distance: 100,
  threshold: 0.6,
};

type Props = {
  collection: [];
  keys: string[];
  debounceTime?: number;
};

const useFuzzySearch = (_options: Props) => {
  const [filterdList, setfilterdList] = useState(_options.collection);
  const [rawSearch, setSearch] = useState("");
  const search = useDebounce(rawSearch, _options.debounceTime ?? 500);
  const fuseOptions = useMemo(
    () => ({ ...DEFAULT_FUSE_OPTIONS, keys: _options.keys }),
    [_options.keys]
  );

  const query = (value: string) => setSearch(value);
  const onSearch = (e: React.FormEvent<HTMLInputElement>) =>
    query(e.currentTarget.value);

  useEffect(() => {
    const fuse = new Fuse(_options.collection, fuseOptions);
    const fuseResult = fuse.search(search);
    const result = fuseResult.map((r) => r.item) as [];

    setfilterdList(search ? result : _options.collection);
  }, [search]);

  return { filterdList, onSearch, query };
};

export default useFuzzySearch;
