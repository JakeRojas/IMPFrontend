'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import MasterLayoutUI from '@/app/layout/masterLayout.layout';
import { useGetUser } from '@/hooks/useUser';
import UserDetail from '@/app/users/[id]/userDetails.layout';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const { user, error } = useGetUser(id);

    return (
        <MasterLayoutUI>
            <>
                <UserDetail user={id} />
            </>
        </MasterLayoutUI>
        
    );
}