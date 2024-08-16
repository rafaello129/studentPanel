import { useEffect, useState } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

export const usePackageQueryParams = () => {
  const [pkg, setPkg] = useQueryParam('package', NumberParam);
  const [currentPackage, setCurrentPackage] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    setCurrentPackage(pkg === null ? undefined : pkg);
  }, [pkg]);

  return [currentPackage, setPkg] as const;
};
