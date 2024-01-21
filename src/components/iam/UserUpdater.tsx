import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import axios from "@/utils/axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import React, { useState } from "react";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Checkbox from "@mui/joy/Checkbox";
import { getUser, listAuthority, listGroup, updateUser } from "@/services/iam";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";

export default function UserUpdater() {
  const navigate = useNavigate();

  let { id } = useParams();
  const dataQuery = useQuery(["data"], () => getUser(id as string, true),{
      refetchOnMount: true,
    }
  );

  const [addGroupIds, setAddGroupIds] = useState<string[]>([]);
  const [removeGroupIds, setRemoveGroupIds] = useState<string[]>([]);

  const { isLoading, mutate } = useMutation<
    any,
    Error
  >(async () => {
    await updateUser(id as string, {addGroupIds, removeGroupIds})
    dataQuery.refetch()
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const setIds = (addGroupIds: string[], removeGroupIds: string[]) => {
    setAddGroupIds(addGroupIds);
    setRemoveGroupIds(removeGroupIds);
  };

  if (dataQuery.isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <CircularProgress variant="soft" />
      </Box>
    );
  }

  const resData = dataQuery.data;

  return (
    <>
      <span
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardBackspaceIcon color="primary" />
      </span>
      <span>用户名：{resData?.name}</span>
      <span>用户邮箱：{resData?.email}</span>
      <form onSubmit={handleSubmit} id="demo">
        <Groups checkedIds={resData?.groupIds as string[]} setIds={setIds} />
        <Button
        variant="solid"
        color="primary"
        loading={isLoading}
        type="submit"
      >
        保存
      </Button>
      </form>
     
    </>
  );
}

interface GroupProps {
  checkedIds: string[];
  setIds: (addGroupIds: string[], removeGroupIds: string[]) => void;
}
function Groups({ checkedIds, setIds }: GroupProps) {
  const [removeGroupIds, setRemoveGroupIds] = useState<string[]>([]);
  const [addGroupIds, setAddGroupIds] = useState<string[]>([]);
  const [checkedIdSet, setCheckedIdSet] = useState(new Set(checkedIds))
  console.log("checkedIdSet", checkedIdSet)
  const fetchRepositories = async (page: string) => {
    return await listGroup({ pageSize: 5, pageToken: page });
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "repos",
      ({ pageParam = "" }) => fetchRepositories(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage?.pagination.nextPageToken === "") {
            return undefined;
          }
          return lastPage.pagination.nextPageToken;
        },
      }
    );

  return (
    <div>
      <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
        用户组
      </Typography>
      <div role="authorities" aria-labelledby="sandwich-group">
        <List size="sm">
          {data?.pages.map((page) =>
            page?.items.map((data) => (
              <ListItem>
                <Checkbox
                  label={data?.name}
                  defaultChecked={checkedIdSet.has(data?.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addGroupIds.push(data?.id);
                      const removeSet = new Set(removeGroupIds)
                      removeSet.delete(data?.id)
                      const addSet = new Set(addGroupIds);
                      setAddGroupIds([...addSet]);
                      setRemoveGroupIds([...removeSet])
                      setIds([...addSet], [...removeSet]) ;
                    } else {
                      removeGroupIds.push(data?.id);
                      const addSet = new Set(addGroupIds)
                      addSet.delete(data?.id)
                      const removeSet = new Set(removeGroupIds);
                      setAddGroupIds([...addSet]);
                      setRemoveGroupIds([...removeSet])
                      setIds([...addSet], [...removeSet]) ;
                    }
                  }}
                />
              </ListItem>
            ))
          )}
          {hasNextPage ? (
            <span
              onClick={() => {
                fetchNextPage();
              }}
            >
              <MoreHorizSharpIcon titleAccess="更多" />
            </span>
          ) : null}
        </List>
      </div>
    </div>
  );
}
