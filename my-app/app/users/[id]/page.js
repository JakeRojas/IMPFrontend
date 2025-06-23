'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import MasterLayoutUI from '@/components/layoutsUI/masterLayout.ui';
import { useGetUser } from '@/hooks/useUser';
import UserDetail from '@/components/usersUI/userDetails.ui';

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